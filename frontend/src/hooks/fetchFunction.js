

export const fetchWithGet = ((url, state, setState, SetErrorState) => {
fetch(url)
.then(response => response.json())
.then(data => {
  if (data.response === "Request sucessfull: ") {
    setState(data.data)
    } else 
    {
      SetErrorState(data.message)
    }
  })
}) 