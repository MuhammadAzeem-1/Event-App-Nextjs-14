import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/category.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ onChangeHandler, value }: DropdownProps) => {
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "nextjs", // temporeary
    },
  ]);
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory =()=>{
      createCategory({
        categoryName: newCategory.trim()
      }).then((category) => {
        setCategories((prevState) => [...prevState, category])
      })
  }

  useEffect(()=>{
    const getCategories = async () =>{
      const CategoryList = await getAllCategories()

      CategoryList && setCategories(CategoryList)
    }

    getCategories()
  },[])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-feild">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category?.id}
              value={category?.name}
              className="select-item p-regular-14"
            >
              {category?.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add New Category</AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Category name" className="input-feild mt-3" onChange={(e)=> setNewCategory(e.target.value)}/>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
