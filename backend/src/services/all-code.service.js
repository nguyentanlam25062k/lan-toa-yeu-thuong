import db from '../models/index';
const allCodeService = {};

allCodeService.getAllCode = (field) => {
  console.log('field', field);
  return new Promise(async (resolve, reject) => {
    try {
      if (field){
        const allCode = await db.All_Code.findAll({where: {type: field}});
        if(allCode) {
          resolve({
            code: 0,
            msg: `Get all code of field success !`,
            body: allCode,
          })
        } else{
          resolve({
            code: 2,
            msg: `Can't not found field !`
          })
        }
      } else {
        resolve({
          code: 1,
          msg: 'Missing field !'
        })
      }
    } catch (e) {
      console.log(e)
      reject({
        code: -1,
        msg: 'Error from server !'
      });
    }
  })
}

export default allCodeService;