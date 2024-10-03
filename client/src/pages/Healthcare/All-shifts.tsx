import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useShiftStore } from "../../redux/store/shiftStore";
import { useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/DateFormatter";

interface CustomJwtPayload extends JwtPayload {
  hospitalId: string;
  hospitalName: string;
}

const AllShifts = () => {
  const healthcareToken = Cookies.get("healthcareToken");
  const decode = healthcareToken
    ? jwtDecode<CustomJwtPayload>(healthcareToken)
    : null;

  const { shiftsHealthcare, setShiftsHealthcare } = useShiftStore();

  const getHealthcareShifts = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/hospital/getShiftForAHealthCare/${
          decode?.hospitalId
        }`
      );

      setShiftsHealthcare(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHealthcareShifts();

    const interval = setInterval(getHealthcareShifts, 4000); // do not remove. will change this flow later to socket io
    return () => clearInterval(interval);
  }, []);

  // console.log(shiftsHealthcare?.yourShift); //do not remove. will change this flow later to socket io

  const getRate = shiftsHealthcare?.yourShift
    .map((r) => Number(r.payRate))
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <main className=" p-8 ml-64">
      <Table>
        <TableCaption>A list of your posted shifts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Pay Rate</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shiftsHealthcare?.yourShift?.map((shift) => (
            <TableRow key={shift._id}>
              <TableCell className="font-medium">
                {formatDate(shift.date)}
              </TableCell>
              <TableCell>{shift.duration}</TableCell>
              <TableCell>{shift.specialization}</TableCell>
              <TableCell>{shift.payRate}</TableCell>
              <TableCell>{shift.location}</TableCell>
              <TableCell>{shift.status || "Active"}</TableCell>
              <TableCell>
                <Link
                  to={`/curaflux/healthcare/admin/shift-details/${shift._id}`}
                >
                  <Button
                    size={"sm"}
                    className=" bg-transparent text-black border hover:text-white"
                  >
                    View Details
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>${getRate}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
};

export default AllShifts;
