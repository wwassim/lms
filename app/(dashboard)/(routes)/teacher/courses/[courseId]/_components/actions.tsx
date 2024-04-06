"use client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface ActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, courseId, isPublished }: ActionProps) => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const onClick = async () => {
    try {
      setIsloading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Chapter unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Chapter published");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsloading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Chpater deleted");
      router.refresh();
      router.push(`teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
