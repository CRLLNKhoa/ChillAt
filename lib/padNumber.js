export function padNumberWithZero(number) {
    // Chuyển số thành chuỗi
    const numberString = number.toString();
  
    // Nếu chuỗi chỉ có một ký tự, thêm số 0 vào trước
    if (numberString.length === 1) {
      return '0' + numberString;
    }
  
    // Nếu chuỗi có nhiều hơn một ký tự, trả về chuỗi ban đầu
    return numberString;
  }