#!/bin/bash

# SSH连接并执行远程命令
ssh jimmywong.cn << 'EOF'
  cd ~/github/aboutworks/hugotheme || exit
  git pull --all
EOF