import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStudents } from "@/hooks";
import { useState } from "react";
import type { Group } from "@/api/group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
const GENDERS = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
];


const initialFormValues = {
  firstname: "",
  surname: "",
  group_id: undefined as number | undefined,
  gender_id: undefined as number | undefined,
  year: 1,
  birth_date: "",
};

function AddStudentForm({ groups, onStudentAdded }: { groups: Group[],onStudentAdded?: () => void  }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { createStudent } = useStudents();

  const handleSubmit =async () => {
    if (!formValues.group_id || !formValues.gender_id) {
    return;
  }
  try{
    await createStudent({
    firstname: formValues.firstname,
    surname: formValues.surname,
    group_id: formValues.group_id,
    gender_id: formValues.gender_id,
    year: Number(formValues.year),
    birth_date: new Date(formValues.birth_date).toISOString(),});

    setFormValues(initialFormValues);
    onStudentAdded?.();
  }
  catch (err) {
    console.error(err);
  };
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "year") {
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
        <Select
          value={formValues.group_id? String(formValues.group_id):""}
          onValueChange={(value) =>
          setFormValues({
            ...formValues,
            group_id: Number(value),
          })
          }
        >
        <SelectTrigger>
          <SelectValue placeholder="Select group" />
        </SelectTrigger>
        <SelectContent>
          {groups.map((group) => (
            <SelectItem key={group.id} value={group.id.toString()}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
        </Select>

        <Input
          type="number"
          name="year"
          placeholder="Course year"
          onChange={handleInputChange}
          value={formValues.year}
        />
        <Select
          value={formValues.gender_id ? String(formValues.gender_id) : ""}
          onValueChange={(value) =>
          setFormValues((prev) => ({
            ...prev,
            gender_id: Number(value),
          }))
          }
        >
        <SelectTrigger>
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>

        <SelectContent>
          {GENDERS.map((gender) => (
            <SelectItem key={gender.id} value={String(gender.id)}>
              {gender.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

        <Input
          name="birth_date"
          placeholder="Birth date {YYYY-MM-DD}"
          onChange={handleInputChange}
          value={formValues.birth_date}
        />
      </div>

      <div className="flex flex-row items-end justify-end">
        <Button 
        disabled={!formValues.group_id || !formValues.gender_id}
        onClick={handleSubmit} className="mt-4">
          Add student
        </Button>
      </div>
    </div>
  );
};

export { AddStudentForm };
