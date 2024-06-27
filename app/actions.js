'use server';
import { redirect } from 'next/navigation';
export async function handleOptionSelect(optionID, correct, questionID) {
    console.log(`Selected option ID: ${optionID}`);
    console.log(`Correct option ID: ${correct}`);
    console.log(`Question ID: ${questionID}`);
}

export async function onQuizComplete(params_uri) {
    console.log('Quiz completed of', params_uri);
    redirect(`/${params_uri}/result`);
}

export async function test(code) {
    console.log('tesst', code);

}
