import allCodeService from "../services/all-code.service";

const allCodeController = {};

allCodeController.getAllCode = async (req, res) => {
  try {
    const data = await allCodeService.getAllCode(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json(e);
  }
}

export default allCodeController