//Component for the snow conditions table

import styled from "styled-components"
import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';

export const SnowConditionsTable = () => {
  
  const [center, setCenter] = useState(null);
  const [conditionsTable, setConditionsTable] = useState(null)
  const [centerConditonUrl, setcenterConditonUrl] = useState(null);
  
  const {centerId} = useParams();

  //Fetch the centers informations from database
  
  useEffect(() => {
    if (centerId) {
      fetch(`/api/center/${centerId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          setCenter(data.data)
          setConditionsTable((JSON.parse(data.data.condition)[0]));
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${centerId}:`, error);
    });
  }

  },[]);


  //Todo Remove this when my condition center work from import
  //Fetch the centers condition url information from the database
  useEffect(() => {
    if (center) {
      fetch(`/api/centersCondition/${center.name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          setcenterConditonUrl(data.data.scrapping.conditionUrl)
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${center.name}:`, error);
    });
  }
  },[center]);
  
  return (
    <>
      {/* <SnowConditionsTable center={center}/> */}
      <h3>Conditions</h3>
      {conditionsTable ? (
        <ConditionTable>
          <thead>
            <tr>
              <th className="col0">Open/Close</th>
              <th className="col1">Track Close</th>
              <th className="col2">Snow conditions</th>
              <th className="col3">Warnings</th>
              <th className="col4">Last Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <>
                <td>{conditionsTable.Open ? "Open" : "Closed"}</td>
                <td>
                  {conditionsTable.closedTracks
                    ? conditionsTable.closedTracks
                    : noDataMessage}
                </td>
                <td>
                  {console.log(conditionsTable)}
                  {conditionsTable.Conditions
                    ? conditionsTable.Conditions
                    : noDataMessage}
                </td>
                <td>
                  {conditionsTable.Warnings != "null" ||
                  conditionsTable.Warnings != ""
                    ? conditionsTable.Warnings
                    : noDataMessage}
                </td>
                <td>
                  {conditionsTable.LastUpdatedDate
                    ? conditionsTable.LastUpdatedDate
                    : noDataMessage}
                </td>
              </>
            </tr>
          </tbody>
        </ConditionTable>
      ) : (
        <h3>Conditions unavailable for the moment...</h3>
      )}
      <p>
        For more details, you can visit the website directly{" "}
        <a target="_blank" href={centerConditonUrl}>
          here
        </a>
        .
      </p>

      {/* Pour plus détails, vous pouvez visiter le site internet du centre, ici */}
    </>
  );
}

const ConditionTable = styled.table`
  display: grid;
  min-width: 100%;
  grid-template-columns:auto repeat(4, 1fr);
  grid-template-rows: 0.3fr 1fr;
  grid-gap: 0.5em;
  border-radius: 15px;
  background-color: var(--box-bg-color);
  font-weight:bold;
  background-color: rgb(129, 15, 209);
  padding:0.5em;

  thead,tbody{
    display: contents;
  }

  th {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border:none;
    border-width: 0 0.3em 0.5em 0.3em;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px
  }

  td {
    border-radius: 15px;
    background-color: white;
  }

  tr{
    display:contents;
    border-radius: 15px;
  }

  
  th, tr,td {
  word-wrap: break-word;
  font-size: 1em;
  padding:0.5em;
  text-align: center;
  overflow: hidden;
  }
`


