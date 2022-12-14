import { createApp } from "./app";

const app = createApp();

// init
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// JUST EXAMPLE FOR TYPE_선언.
let BUILD_MODE_PRODUCTION = true;
if (BUILD_MODE_PRODUCTION) {
}
