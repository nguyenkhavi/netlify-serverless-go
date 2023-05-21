# get __dirpath
__dirpath="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# log "dirpath: $__dirpath"
# __dirpath + /src/icons
__dirpath="$__dirpath/src/icons"

files=$(find $__dirpath -type f -name "*Icon.tsx" -exec grep -l "Icon" {} \;)
echo "" > "$__dirpath/Imports.tsx"

for file in $files
do
  name=$(echo $file | sed -E 's/.*\/(.*)\.tsx/\1/')
  linkForder=$(echo $file | sed -E 's/.*\/src\/icons\/(.*)\.tsx/\1/')
  echo "import $name from './$linkForder'" >> "$__dirpath/Imports.tsx"
done

echo "\nexport const Icons = {" >> "$__dirpath/Imports.tsx"
for file in $files
do
  name=$(echo $file | sed -E 's/.*\/(.*)\.tsx/\1/')
  echo "  $name: { icon: $name }," >> "$__dirpath/Imports.tsx"
done
echo "}" >> "$__dirpath/Imports.tsx"






