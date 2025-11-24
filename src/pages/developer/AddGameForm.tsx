import { useForm } from 'react-hook-form';

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Developer's Name" {...register("Developer's Name", {required: true, min: 2})} />
            <input type="text" placeholder="Game's Title" {...register("Game's Title", {required: true, min: 2})} />
            <input type="text" placeholder="Game Description" {...register("Game Description", {required: true})} />
            <input type="number" placeholder="Game price" {...register("Game price", {required: true})} />
            <input type="text" placeholder="Game Url" {...register("Game Url", {required: true, maxLength: 12})} />
            <input type="text" placeholder="Rule Name" {...register} />
            <input type="text" placeholder="Rule Description" {...register} />

            <input {...register("Rule Category", { required: true })} type="radio" value="SetUp" />
            <input {...register("Rule Category", { required: true })} type="radio" value="Game Play" />
            <input {...register("Rule Category", { required: true })} type="radio" value="Winning" />

            <input type="submit" />
        </form>
    );
}