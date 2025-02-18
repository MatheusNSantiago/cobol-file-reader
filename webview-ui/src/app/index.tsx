import { useGetTableData } from "../api/useGetTableData";

const App = () => {
  const { isLoading, table } = useGetTableData({
    group: "601-REG-GERAL",
    file: "BRT.DEB.DEB601.BAIXA.SS000101",
    copybook: "DEBK601",
  });
  //
  // if (!isLoading) {
    return <div>não carregou</div>;
  // }

  // return <div>{JSON.stringify(table)}</div>;
};
export default App;
