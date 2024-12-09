import { useRecoilState } from "recoil";
import DateRangePicker from "./DateRangePicker";
import { age } from "../../atoms/age";
import { gender } from "../../atoms/gender";


const Filter = () => {

  const [ageFilter, setAgeFilter] = useRecoilState<"15-25" | ">25" | null>(age);
  const [genderFilter, setGenderFilter] = useRecoilState<
    "Male" | "Female" | null
  >(gender);

  return (
    <section className="filters">
        <div>
          <select
            value={ageFilter || ""}
            onChange={(e) => setAgeFilter(e.target.value === "" ? null :  e.target.value as any)}
          >
            <option value="" disabled>Select Age</option>
            <option value="15-25">15-25</option>
            <option value=">25">&gt;25</option>
          </select>
        </div>
        <div>
          <select
            value={genderFilter || ""}
            onChange={(e) =>
                // @ts-expect-error 
              setGenderFilter(e.target.value === "" ? null : e.target.value)
            }
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

      <div>
        <DateRangePicker />
      </div>
    </section>
  );
};

export default Filter;
