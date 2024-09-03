import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import {
  InstitutionRequestFrontendService,
  IUpdateInstitutionRequestProgressGQL
} from '@studiz/frontend/institution-request-frontend-service';
import {
  IInstitutionRequestModel,
  IInstitutionRequestProgressDataAdminsInfo, IInstitutionRequestStatus,
  IQueryOperatorEnum
} from '@studiz/shared/types/frontend';
import { map, tap } from 'rxjs';
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from '@studiz/frontend/constants';
import {
  ICompleteInstitutionRequestGQL
} from '@studiz/frontend/institution-request-frontend-service';

type ICurrentStep = 'institutionInfo' | 'systemAdminInfo' | 'summary' | 'success';

const initialState: {
  currentStep: ICurrentStep,
  currentInstitutionRequest: IInstitutionRequestModel
} = { currentInstitutionRequest: { adminEmail: '', id: 0, institutionName: '', slug: '' }, currentStep: 'institutionInfo' };


export const InstitutionalRequestStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const progressData = computed(() => store.currentInstitutionRequest().progressData);
    const institutionInfo = computed(() => progressData()?.institutionInfo);
    return {
      institutionInfo,
      progressData
    };
  }),
  withMethods((store) => {
    const completeInstitutionRequestGQL = inject(ICompleteInstitutionRequestGQL)

    const updateInstitutionRequestProgressGQL = inject(IUpdateInstitutionRequestProgressGQL);
    const updateCurrentInstitutionRequest = (currentInstitutionRequest: IInstitutionRequestModel) => {
      patchState(store, { currentInstitutionRequest });
    };

    const updateCurrentStep = (currentStep: ICurrentStep) => {
      patchState(store, { currentStep });
    };

    const completeInstitutionRegistration = () => {
      return completeInstitutionRequestGQL.mutate({
        id: store.currentInstitutionRequest.slug()
      }, {context: {
        [SHOW_ERROR_MESSAGE]: true,
          [SHOW_SUCCESS_MESSAGE]: true
        }})
    }

    const saveProgressData = (formValue: IInstitutionRequestProgressDataAdminsInfo[]) => {
      let currentInstitutionRequest = store.currentInstitutionRequest();
      currentInstitutionRequest = {
        ...currentInstitutionRequest,
        progressData: {
          ...currentInstitutionRequest.progressData,
          adminInfos: formValue
        }
      }
      updateCurrentInstitutionRequest(currentInstitutionRequest)
      return updateInstitutionRequestProgressGQL.mutate({
        id: store.currentInstitutionRequest.id(),
        // params: store.progressData() as IInstitutionRequestProgressData
        params: {
          adminInfos: (store.progressData()?.adminInfos ?? []).map((item) => ({
            email: item?.email,
            firstName: item?.firstName,
            lastName: item?.lastName
          }))
        }
      }, { context: { [SHOW_ERROR_MESSAGE]: true, [SHOW_SUCCESS_MESSAGE]: true } });
    };

    const getInstitutionRequestBySlug = (slug: string) =>
      inject(InstitutionRequestFrontendService)
        .getItems({
          pageSize: 1,
          filters: [
            {
              field: 'slug',
              operator: IQueryOperatorEnum.Equals,
              value: slug,
              values: []
            },
            {
              field: 'status',
              operator: IQueryOperatorEnum.Equals,
              value: IInstitutionRequestStatus.Pending,
              values: []
            }
          ]
        })
        .pipe(
          tap((res) => {
            if (res.items?.[0]?.progressData) {
              updateCurrentInstitutionRequest(res.items?.[0]);
            }
          }),
          map(res => res.items?.[0]?.progressData)
        );
    return {
      getInstitutionRequestBySlug,
      saveProgressData,
      updateCurrentStep,
      completeInstitutionRegistration
    };
  }),
  withHooks((store) => ({
    async onInit() {
      // console.log('INSTITUTIONAL_REQUEST ONINIT');
    }
  }))
);
