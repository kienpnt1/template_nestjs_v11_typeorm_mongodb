export class ArrayUtil {
  /**
   * So sánh hai mảng số mà KHÔNG quan tâm thứ tự phần tử.
   * Trả về:
   * - isEqual: true/false cho biết hai mảng có giống nhau không
   * - differences: liệt kê phần tử chỉ có trong A hoặc chỉ có trong B
   */
  static compareArraysIgnoreOrder(A, B) {
    // Tạo bản sao và sort để so sánh thứ tự
    const aSorted = [...A].sort();
    const bSorted = [...B].sort();

    /**
     * Kiểm tra hai mảng có giống nhau hoàn toàn hay không:
     * - Cùng số lượng phần tử
     * - Sau khi sort, từng phần tử tại từng index phải giống nhau
     */
    const isEqual = aSorted.length === bSorted.length && aSorted.every((v, i) => v === bSorted[i]);

    /**
     * Tìm phần tử có trong A nhưng không có trong B
     * -> nghĩa là B thiếu các giá trị này
     */
    const onlyInA = A.filter((x) => !B.includes(x));

    /**
     * Tìm phần tử có trong B nhưng không có trong A
     * -> nghĩa là A thiếu các giá trị này
     */
    const onlyInB = B.filter((x) => !A.includes(x));

    // Trả về kết quả tổng hợp
    return {
      isEqual,
      differences: {
        onlyInA,
        onlyInB,
      },
    };
  }
}
