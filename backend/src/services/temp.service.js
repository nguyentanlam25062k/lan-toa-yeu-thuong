import db from "../models";
const tempService = {};

tempService.getTemp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const tempList = await db.Product_Category.findAll();
      resolve({
        code: 0,
        msg: "Lấy danh mục sản phẩm thành công !",
        body: tempList
      });
    } catch (e) {
      console.log(e);
      reject({
        code: -1,
        msg: "Error from server"
      });
    }
  });
};

export default tempService;
