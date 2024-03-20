from deepface import DeepFace
import json

result=DeepFace.verify(img1_path="Selfie.png",img2_path="Selfie2.png")

print(json.dumps(result,indent=2))