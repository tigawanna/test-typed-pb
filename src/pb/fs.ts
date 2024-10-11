import { exec } from "child_process";
import { access, mkdir,constants } from "fs/promises";

export async function runCommand(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await new Promise<{ stdout: string; stderr: string | null }>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    if (stderr) {
      console.error("Command errors:", stderr);
    }

    return stdout.toString();
  } catch (error) {
    console.error("Error running command:", error);
    throw error; // Re-throw for further handling if needed
  }
}


export async function checkAndCreateNestsedDir(dirPath: string) {
      try {
        await access(dirPath, constants.R_OK | constants.W_OK);
      } catch (error: any) {
        if (error.code === "ENOENT") {
          await mkdir(dirPath,{ recursive: true });
        }
        throw error;
      }
}
