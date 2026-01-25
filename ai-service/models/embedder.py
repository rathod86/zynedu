import numpy as np
from .sentence_bert import load_model

model = load_model()

def get_embedding(text):
    return model.encode(text)
