import * as path from 'path';

export class FileUtil {
  public static sanitizeFileName(originalName: string, uniqueSuffix?: string): string {
    const ext = path.extname(originalName);
    let nameWithoutExt = path.basename(originalName, ext);

    // chuẩn hóa tên file
    nameWithoutExt = nameWithoutExt
      .toLowerCase()
      .replace(/\s+/g, '_') // khoảng trắng -> "_"
      .replace(/[^a-z0-9_]/g, '') // loại bỏ ký tự đặc biệt và "-"
      .replace(/_+/g, '_'); // gom nhiều "_" liên tiếp thành một

    // nếu tên rỗng (ví dụ file toàn ký tự đặc biệt) thì fallback
    if (!nameWithoutExt) {
      nameWithoutExt = 'file';
    }

    // thêm hậu tố tránh trùng
    const finalName = uniqueSuffix ? `${nameWithoutExt}_${uniqueSuffix}${ext}` : `${nameWithoutExt}${ext}`;

    return finalName;
  }
}
