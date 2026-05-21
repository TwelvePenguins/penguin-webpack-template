import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

export default {
    mode: "development", // Can change to "production"
    entry: "./src/index.js", // Central file with that is the dependency of no other file
    output: {
        filename: "main.js", // Can be anything
        path: path.resolve(import.meta.dirname, "dist"), // Output will be in a "dist" folder
        clean: true, // Will empty output directory whenever bundle executes
    },
    devtool: "eval-source-map", // Source map helps final js file errors to match up with the line numbers of the src js files. Refer https://webpack.js.org/configuration/devtool/ for more options.
    devServer: {
        watchFiles: ["./src/template.html"], // What the live server should watch for
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // Relative path to the html file to parse
        })
    ], 
    module: {
        rules: [
            {
                test: /\.css$/i, // Regex to target any css file
                use: ["style-loader", "css-loader"], // Loads packages from end of array to front of array, handles CSS
            }, 
            {
                test: /\.html$/i, // Regex to target any HTML file
                use: ["html-loader"],  // Loads image files referenced in HTML file
            }, 
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regex to target any common image file types
                type: "asset/resource", // Loads image in JS files
            }
        ]
    }
}