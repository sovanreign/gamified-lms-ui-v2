import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "@/lib/api/announcements";

export default function DeleteConfirmationDialog({
  open,
  setOpen,
  announcement,
}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAnnouncement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setOpen(false); // ✅ Close dialog after successful deletion
    },
  });

  const handleDeleteAnnouncement = () => {
    if (!announcement || !announcement.id) {
      console.error("❌ Announcement ID is missing!");
      return;
    }

    deleteMutation.mutate(announcement.id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Delete Announcement</DialogTitle>
        </DialogHeader>

        <p className="text-gray-700">
          Are you sure you want to delete this announcement?
        </p>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          {announcement?.title}
        </p>

        {/* Footer Buttons */}
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white"
            onClick={handleDeleteAnnouncement}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
