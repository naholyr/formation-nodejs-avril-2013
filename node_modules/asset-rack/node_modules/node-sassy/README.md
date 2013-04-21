node-sassy
==========

A sass compiler for node that relies on your installed ruby gem of sass.

### Installation

    npm install node-sassy

### Example

```javascript
// Simple file example.
sassy.compile(filepath, function(err, css) {
    if(err){
        throw err;
    }
    
    console.log(css);
});

// Multiple files (concatenated)
sassy.compile([filepath1, filepath2, filepath3], function(err, css) {
    if(err){
        throw err;
    }
    
    console.log(css);
});

// Specify where to import from
var opts = {
	includeFrom: path.join(process.cwd(), "style")
};

sassy.compile(filePathWithImport, opts, function(err, css) {
    if(err){
        throw err;
    }
    
    console.log(css);
});
```

License
=======

MIT License, No Attribution Required, Copyright 2013 Jacob Gable