import { addTrucksData } from '../utils/userApi'
export default async function(req, res, next) {
  //const { truckId, temp, lat, lng } = req.query
  try {
    const { truckId, temp, lat, lng } = req.query
    const response = await addTrucksData(truckId, temp, lat, lng)
    res.status(200).json(response)
  } catch (err) {
    console.log(err)
  }
}
