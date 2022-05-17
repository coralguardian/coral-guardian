function customizerMergeObjectWithArrays(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export default customizerMergeObjectWithArrays