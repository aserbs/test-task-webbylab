import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "../ui/badge";
import type { IMovieInfo } from "@/types";

type Props = {
  movieInfo: IMovieInfo | undefined;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const MovieInfoPopup = ({ movieInfo, setIsOpen, isOpen }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Інформація про фільм</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <p>ID: {movieInfo?.id}</p>
          <p>Назва: {movieInfo?.title}</p>
          <p>Рік випуску: {movieInfo?.year}</p>
          <p>Формат: {movieInfo?.format}</p>
          <div className="flex flex-wrap gap-2 items-center">
            В ролях:{" "}
            {movieInfo?.actors.map((actor) => (
              <Badge key={`actor-${actor.id}`}>{actor.name}</Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
