function setupUpload(uploadId, imgId) {
  const upload = document.getElementById(uploadId);
  const img = document.getElementById(imgId);

  if (!upload) return;

  upload.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

setupUpload("outfitUpload", "outfitImg");
setupUpload("hobbyUpload", "hobbyImg");
setupUpload("taskUpload", "taskImg");
setupUpload("workoutUpload", "workoutImg");
setupUpload("mealUpload", "mealImg");
setupUpload("priorityUpload", "priorityImg");