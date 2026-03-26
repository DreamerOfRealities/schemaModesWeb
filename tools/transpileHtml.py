from pathlib import Path

# Read text content from yaml and store as dict
with Path().absolute().joinpath("content\content.yaml").open() as cont:
    cont = cont.read().splitlines()
    contDict = {} #create empty dictionary
    for n in range(1, len(cont)): #go through lines (ignore first one "---")
        newVar = cont[n].split("#",1)[0].split(": ",1) #remove comments.split by name and value
        if len(newVar)>1: #ignore lines without ":"
            contDict[newVar[0]] = "".join(newVar[1:len(newVar)]) #note: not sure if treating only first colon as escape char is yaml conform

# Read html map file and replace keys from dict
with Path().absolute().joinpath("content\schemaModes.map.html").open() as hMap:
    hMap = hMap.readlines()
    for row in range(0, len(hMap)): #check each row...
        for key in contDict.keys(): #...for each key...
            hMap[row] = hMap[row].replace(">"+key+"<", ">"+contDict[key]+"<") #...and replace with value IF key is html content (...>key<...)

# Write new html to file
Path().absolute().joinpath("schemaModes.html").write_text("".join(hMap))