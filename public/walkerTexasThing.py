import os
import subprocess

shpfiles = []
for dirpath, subdirs, files in os.walk('../../'):
    for x in files:
        if x.endswith(".svg"):
            print(os.path.join(dirpath, x))
            bib = os.popen('ipfs add ' + os.path.join(dirpath, x)).read()
            f = open("demofile2.txt", "a")
            f.write(bib + "\n")
            f.close()
