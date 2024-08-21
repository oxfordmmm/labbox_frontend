export const fileSummary = new File(
  [
    `Batch ID,Batch,Sample ID,Sample,Control,Status,Quality,Total Reads (M),TB Reads (M),Main Species,Coverage,Null calls,Mixed calls,Resistance Summary,Resistance Prediction,<=12 SNP
d20c4ca8-aad1-4113-9978-1b75c706eb80,ygc9sp,a270a32b-ebdb-48c4-8ed2-b7dfb74ef472,639db1498bd77245ca5b9152c03d6ec5756a0d8ef5937a622cf3cc2c03ae6bd3,,Complete,,,,,,,,,Complete,`,
  ],
  "summary.csv",
  {
    type: "text/csv",
  }
);

export const fileMapping = new File(
  [
    `batch_name,sample_name,remote_sample_name,remote_batch_name,remote_batch_id
,ffd67539d8,a270a32b-ebdb-48c4-8ed2-b7dfb74ef472,ygc9sp,d20c4ca8-aad1-4113-9978-1b75c706eb80`,
  ],
  "mapping.csv",
  {
    type: "text/csv",
  }
);
