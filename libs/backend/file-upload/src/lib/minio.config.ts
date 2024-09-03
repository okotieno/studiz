export const config = {
  MINIO_ENDPOINT: process.env['FS_MINIO_ENDPOINT'] ?? '',
  MINIO_PORT: Number(process.env['FS_MINIO_PORT']),
  MINIO_ACCESS_KEY: process.env['FS_MINIO_ACCESS_KEY'] ?? '',
  MINIO_SECRET_KEY: process.env['FS_MINIO_SECRET_KEY'] ?? '',
  MINIO_BUCKET: process.env['FS_MINIO_BUCKET'] ?? '',


}
