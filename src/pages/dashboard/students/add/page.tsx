import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStudents } from "@/hooks";
import { useState } from "react";

const initialFormValues = {
  firstname: "",
  surname: "",
  group_name: "",
  major: "",
  course_year: 1,
  gender: "",
  birth_date: "",
};

const AddStudentPage = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { createStudent } = useStudents();

  const handleSubmit = () => {
    createStudent(formValues);

    setFormValues(initialFormValues);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "course_year") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: Number(value),
      }));
      return;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  console.log(formValues);
  return (
    <div className="px-20">
      <h3 className="text-2xl font-semibold mb-6">Add New Student</h3>
      <div className="flex flex-col gap-4">
        <Input
          name="firstname"
          placeholder="First Name"
          value={formValues.firstname}
          onChange={handleInputChange}
        />
        <Input
          name="surname"
          placeholder="Surname"
          value={formValues.surname}
          onChange={handleInputChange}
        />
        <Input
          name="group_name"
          placeholder="Group name"
          value={formValues.group_name}
          onChange={handleInputChange}
        />
        <Input
          name="major"
          placeholder="Major"
          value={formValues.major}
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="course_year"
          placeholder="Course year"
          onChange={handleInputChange}
          value={formValues.course_year}
        />
        <Input
          name="gender"
          placeholder="Gender"
          value={formValues.gender}
          onChange={handleInputChange}
        />
        <Input
          name="birth_date"
          placeholder="Birth date"
          onChange={handleInputChange}
          value={formValues.birth_date}
        />
      </div>

      <div className="flex flex-row items-end justify-end">
        <Button onClick={handleSubmit} className="mt-4">
          Add student
        </Button>
      </div>
    </div>
  );
};

export { AddStudentPage };
