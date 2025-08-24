export const Checkbox: React.FC<{
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }> = ({ id, name, checked, onChange }) => {
    return (
        <div className="form-control mt-2">
        <label className="cursor-pointer label">
            <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="checkbox checkbox-primary"
            />
            <span className="label-text ml-4 ">{name}</span>
        </label>
        </div>
    );
    };