import { Button, Tooltip } from "@mui/material";
import { usePokemonData } from "../hooks/FeedProvider/usePokemonData";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export default function ScrollToTop() {
  const { scrollToTop, topButton } = usePokemonData();
  return (
    <div>
      {topButton && (
        <Tooltip title="Scroll to top">
          <Button
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: 32,
              right: 32,
              zIndex: 1,
              transition: "all 1s ease-in-out",
            }}
          >
            <ArrowCircleUpIcon sx={{ fontSize: 40 }} />
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
