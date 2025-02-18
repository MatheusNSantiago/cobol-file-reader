import { VSCodeProgressRing, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import "./App.css";

import { JobsExplorerRow } from "./components/JobsExplorerRow";
import { useGetJobs } from "./api/useGetJobs";
import { FormEvent, useState } from "react";
import { JobResponse } from "./models/jobs/JobCreationResponse.model";
import { JobPage } from "./components/JobPage";
import { ConfigurationProvider } from "./config/configuration";
import { SearchIcon } from "./components/icons/SearchIcon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigurationProvider>
        <Main />
      </ConfigurationProvider>
    </QueryClientProvider>
  );
}

// This function displays the main page of the extension
// It contains the search bar and the list of templates
function Main() {
  const [searchJob, setSearchJob] = useState("");

  // This state is used as a flag to display the template page
  // If it is undefined, the main page is displayed
  // If it is not undefined, the template page is displayed
  const [jobToDisplay, setJobToDisplay] = useState<JobResponse | undefined>(undefined);

  // This function is called when the user types in the search bar and press enter
  const handleSearchJob = (e: Event | FormEvent<HTMLElement> | any) => {
    setSearchJob(e.target._value);
  };

  // This function is called when the user clicks on a template
  const showJobPageFunction = (job: JobResponse | undefined) => {
    setJobToDisplay(job);
  };

  // This function is called on load to get the list of templates or when the user types in the search bar
  const { count, jobs, loading, error } = useGetJobs({ searchName: searchJob });

  return (
    <main>
      {!jobToDisplay && (
        <>
          <h1>Marketplace</h1>
          <section className="">
            <VSCodeTextField
              placeholder={"Search for templates"}
              onChange={(e) => {
                handleSearchJob(e);
              }}>
              <span slot="start">
                <SearchIcon />
              </span>
            </VSCodeTextField>
          </section>
        </>
      )}

      {/* Handle the loading, templates not found  and the errors */}
      {loading && <VSCodeProgressRing />}
      {!loading && count === 0 && <p>No templates found</p>}
      {!loading && error && <p style={{ color: "red" }}>{JSON.stringify(error.toJSON())}</p>}

      {/* Display the list of templates */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          width: "100%",
        }}>
        {!jobToDisplay &&
          jobs &&
          count > 0 &&
          jobs?.map((job) => {
            return <JobsExplorerRow job={job} key={job.id} onJobClick={showJobPageFunction} />;
          })}
      </div>
      {/* Display the button (switch to template list on click) and the template page */}
      {jobToDisplay && (
        <JobPage
          onBackClick={() => {
            setJobToDisplay(undefined);
          }}
          job={jobToDisplay}
        />
      )}
    </main>
  );
}
