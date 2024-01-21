const xlsx = require("xlsx");
const fs = require("fs").promises;

const keysFile = xlsx.readFile("./arquivos_para_manter.xlsx");

const worksheetName = "Planilha1";
const worksheet = keysFile.Sheets[worksheetName];

const jsonData = xlsx.utils.sheet_to_json(worksheet, {
  blankrows: true,
  defval: "",
  header: 1,
  rawNumbers: false,
});

const dataKeysParsed = jsonData.map((row) => row[0]);

const getFiles = async () => {
  const dir = "./xmls";
  const files = await fs.readdir(dir);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!dataKeysParsed.includes(file.replace(".xml", ""))) {
      console.log("Deletar: ", file);
      fs.unlink(`${dir}/${file}`);
    }
  }
};

getFiles();