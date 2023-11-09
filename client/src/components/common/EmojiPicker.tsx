import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const EmojiPicker = (props: any) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "999",
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
