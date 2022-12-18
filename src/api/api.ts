import { firstDataArr, secondDataArr } from "../components/constants/mockEndpointData";
import { endpointType } from "../components/constants/types";
import { checkboxType } from "../components/SpaTable/types";

const url = (endpoint: string) => `http://localhost:3000/${endpoint}`;



export const getTableData = async() => {
  /*const response = await fetch(url());
  console.log('response.json()',response.json());
  return response.json();*/
  const result = [...firstDataArr, ...secondDataArr]
  return result as endpointType[]
};
export const postResponce = async (goodsArr:Array<checkboxType>): Promise<void> => (
  await fetch(url('cancel'), {
    method: "POST",
    body: JSON.stringify(goodsArr),
    headers: { "Content-Type": "application/json" },
  })
).json();