import Base from "./base";
import Response from "./response";

export default interface Survey extends Base {
    title: string;
    questions: string[];
    responses: Response[];
}

