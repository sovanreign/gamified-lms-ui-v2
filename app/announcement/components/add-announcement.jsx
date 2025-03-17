import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnnouncement } from "@/lib/api/announcements";
import { useForm } from "react-hook-form";

export default function AddAnnouncementDialog({ open, setOpen }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createMutation = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setOpen(false);
      reset(); // Reset form fields after submission
    },
  });

  const onSubmit = (data) => {
    const authorId = localStorage.getItem("id"); // Get author ID from localStorage
    if (!authorId) {
      alert("No author ID found. Please log in.");
      return;
    }
    createMutation.mutate({ ...data, authorId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Add Announcement</DialogTitle>
        </DialogHeader>

        {/* Form with react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Input */}
          <div>
            <Input
              type="text"
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <Textarea
              placeholder="Write your announcement here..."
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-white"
              type="submit"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Posting..." : "Post Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
