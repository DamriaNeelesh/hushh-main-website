// /pages/job/[id].jsx
import { useRouter } from "next/router";
import { Box, Text, VStack, UnorderedList, ListItem } from "@chakra-ui/react";
import jobs  from "../_components/career/jobDetails";
import JobDetail from "../_components/career/jobDetails";

  const JobDetailPage = ({ job }) => {
    const router = useRouter();
//   const { id } = router.query; 
const {id} = params;
const job = jobs.find((job) => job.id.toString() === id);

  if (router.isFallback) {
    return <Text>Loading...</Text>;
  }
    return (
    <JobDetail job={job}/>
    );
  };

export default JobDetailPage;