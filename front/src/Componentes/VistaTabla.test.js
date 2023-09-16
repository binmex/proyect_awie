import Axios from "axios"

const config = {
    headers:{
        Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTE5MzUxNzExOCwibmFtZSI6InJvYmluIiwiaWF0IjoxNjk0ODc5NDU1LCJleHAiOjE2OTQ5NjU4NTV9.pUr5hrrw8ppfz32SzvfFJxVR06wrVLgrHffudMb1Lm0"
    }
  };

  test("Get usuarios", async () => {
    const response = await Axios.get(
      "http://localhost:4000/api/ventas/visualizar",
      config
    );
    expect(response.status).toBe(200);
  });

  test("Get Factura", async()=>{
    const response = await Axios.get(
        `http://localhost:4000/api/ventas/visualizar/${1}`,
        config
      );
      expect(response.data).toBeTruthy();
  })

     
