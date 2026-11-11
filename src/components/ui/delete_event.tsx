"use client"
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
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { Button } from "./button"

exitconst DeleteEvent = ({ event }) => {
    const id = event.id;
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/events/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        console.log(data);
        router.push("/events");
    }
    return (
        
<AlertDialog>
  <AlertDialogTrigger className="rounded-lg bg-red-400 hover:bg-red-600 px-5 py-3 text-center font-medium text-white" render={<Button />}>
      
              Delete
               
            
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure? {id}</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. {event.title} event will be permanently deleted from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    );
};

export default DeleteEvent;