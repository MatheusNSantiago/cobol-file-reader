// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

// const vscode = (window as any).acquireVsCodeApi(); // Obtenha a API do VS Code

// type GetTableInfoResponse = {
//   groupNames: string[];
// };

// const useGetTableInfo = (copybook: string) => {
//   const [groupNames, setGroupNames] = useState<string[]>([]);
//   const [isFetched, setIsFetched] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     setLoading(true);
//     vscode.postMessage({ command: "getGroups", copybook: copybook });

//     const messageListener = (event: any) => {
//       const message = event.data;
//       switch (message.command) {
//         case "groupsReady":
//           setGroupNames(message.groups);
//           setIsFetched(true);
//           setLoading(false);
//           break;
//         case "error":
//           console.error("Erro ao obter grupos:", message.message);
//           setLoading(false);
//           break;
//       }
//     };

//     window.addEventListener("message", messageListener);

//     return () => {
//       window.removeEventListener("message", messageListener); // Limpe o listener ao desmontar
//     };
//   }, [copybook]);

//   return { groupNames, isFetched, loading };
// };

// // const useGetTableInfo = (copybook: string) => {
// // const queryClient = useQueryClient();
// //
// // const { data: { groupNames = [] } = {}, isFetched } =
// //   useQuery<GetTableInfoResponse>({
// //     queryKey: ["table-group"],
// //     queryFn: async () => {
// //       const url = new URL(
// //         `http://127.0.0.1:8000/groups?copybook=${copybook}`,
// //       );
// //       const res = await fetch(url.href);
// //
// //       const groupNames = (await res.json()) as string[];
// //
// //       return { groupNames };
// //     },
// //     enabled: !queryClient.getQueryData<GetTableInfoResponse>(["table-group"]),
// //   });
// //
// // return { groupNames, isFetched };
// // };

// export default useGetTableInfo;
