#!/bin/bash
eval "$(conda shell.bash hook)"
conda activate pipeline-profiles
cd src/data_management
python getMapFiles.py
conda deactivate