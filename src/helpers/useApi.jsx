import React from "react"

export const apiStates = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
}

export const useApi = ({ url }, [...dependencyArray] = []) => {
  const [data, setData] = React.useState({
    state: apiStates.LOADING,
    error: "",
    data: [],
  })

  React.useEffect(() => {
    const setPartData = (partialData) => setData({ ...data, ...partialData })
    setPartData({
      state: apiStates.LOADING,
    })
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPartData({
          state: apiStates.SUCCESS,
          data: data.results,
        })
      })
      .catch(() => {
        setPartData({
          state: apiStates.ERROR,
          error: "fetch failed",
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyArray])

  return data
}
