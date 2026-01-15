export const config = {
  toolbar: [
    {
      name: "basicstyles",
      items: ["Bold", "Underline", "Italic", "RemoveFormat"]
    },
    { name: "links", items: ["Link", "Unlink"] },
    { name: "clipboard", items: ["Undo", "Redo"] },
    {
      name: "paragraph",
      groups: ["list", "blocks", "align", "bidi", "justify"],
      items: [
        "NumberedList",
        "BulletedList",
        "-",
        "Blockquote",
        "CreateDiv",
        "-",
        "JustifyLeft",
        "JustifyCenter",
        "JustifyRight",
        "JustifyBlock"
      ]
    },
    "/",
    { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
    { name: "colors", items: ["TextColor", "BGColor"] }
  ],
  extraPlugins: "justify,showblocks,font",
  // removePlugins : 'elementspath,save,image,flash,iframe,smiley,tabletools,find,pagebreak,templates,about,maximize,showblocks,newpage,language',
  removeButtons: "Subscript,Superscript"
};
