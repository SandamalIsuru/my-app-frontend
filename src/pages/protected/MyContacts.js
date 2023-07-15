import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../apis/Api";
import PageTitle from "../../components/common/PageTitle";
import PageWrapper from "../../components/common/PageWrapper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "../../components/common/Card";
import Pagination from "../../components/common/Pagination";
import Dropdown from "../../components/common/Dropdown";
import { NATIONALITY } from "../../config/Constants";

const MyContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [count] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [selectedGender, setSelectedGender] = useState({
    label: "All",
    value: 1,
  });
  const [selectedNationality, setSelectedNationality] = useState({
    label: "US",
    value: 1,
  });

  useEffect(() => {
    setRefresh(true);
  }, []);

  useEffect(() => {
    setRefresh(true);
  }, [page]);

  useEffect(() => {
    if (page !== 0) setPage(0);
    else setRefresh(true);
    // eslint-disable-next-line
  }, [selectedGender.label, selectedNationality.label, setRefresh]);

  useEffect(() => {
    const refreshUsers = () => {
      setIsLoading(true);
      getUsers(page, count, selectedGender.label, selectedNationality.label)
        .then((response) => {
          // Total pages will be set based on the total number of element whick BE return. this is hardcorded because the enpoint is been used here does not set that value
          setTotalPages(10);
          setUsers(response.results);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    };

    if (refresh) {
      setRefresh(false);
      refreshUsers();
    }
    // eslint-disable-next-line
  }, [refresh, setRefresh]);

  return (
    <PageWrapper
      isLoading={isLoading}
      className={"mb-10"}
      content={
        <div
          className={classNames(
            "flex flex-col items-center justify-center text-textPrimary"
          )}
        >
          <PageTitle className={"w-full"} title="My" boldTitle="Contacts" />
          <div className="flex w-full justify-end mt-3">
            <div className="flex flex-row xxs:w-full md:w-2/5 space-x-4">
              <Dropdown
                className={`w-1/2`}
                name={"mobile_number"}
                value={selectedGender}
                onChange={setSelectedGender}
                options={[
                  { label: "All", value: 1 },
                  { label: "Male", value: 2 },
                  { label: "Female", value: 3 },
                ]}
                isMulti={false}
                placeholder={""}
                isDisabled={false}
              />
              <Dropdown
                className={`w-1/2`}
                name={"mobile_number2"}
                value={selectedNationality}
                onChange={setSelectedNationality}
                options={NATIONALITY}
                isMulti={false}
                placeholder={""}
                isDisabled={false}
              />
            </div>
          </div>

          <div className="w-full mt-12">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {users.map((user, index) => (
                  <Grid item xs={12} lg={4}>
                    <Card
                      image={user.picture.large}
                      name={`${user.name.first} ${user.name.last}`}
                      email={user.email}
                      mobile={user.phone}
                      address={user.location.city}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page - 1)}
              />
            </div>
          )}
        </div>
      }
    />
  );
};
export default MyContacts;
