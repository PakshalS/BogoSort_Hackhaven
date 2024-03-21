from deepface import DeepFace
import json
veri = DeepFace.verify(img1_path="aadi.jpg", img2_path="Diksh.jpg")
print(json.dumps(veri, indent=3))