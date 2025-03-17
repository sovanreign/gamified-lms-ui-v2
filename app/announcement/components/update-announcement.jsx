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
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncement } from "@/lib/api/announcements";
import { useForm } from "react-hook-form";

export default function UpdateAnnouncementDialog({
  open,
  setOpen,
  announcement,
}) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [localAnnouncement, setLocalAnnouncement] = useState(null);

  // useEffect(() => {
  //   if (announcement) {
  //     setValue("title", announcement.title);
  //     setValue("message", announcement.message);
  //   }
  // }, [announcement, setValue]);

  useEffect(() => {
    if (announcement) {
      setLocalAnnouncement(announcement); // ✅ Ensure state updates
      reset({ title: announcement.title, message: announcement.message });
    }
  }, [announcement, reset]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAnnouncement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setOpen(false);
    },
  });

  const onSubmit = (data) => {
    console.log("🔍 Submitting update for ID:", announcement?.id); // Debugging log

    if (!announcement?.id) {
      console.error("❌ Announcement ID is missing!");
      return;
    }

    updateMutation.mutate({ id: announcement.id, data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Update Announcement</DialogTitle>
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
              placeholder="Update your announcement here..."
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-white"
              type="submit"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Updating..." : "Update Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
